import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import { truncateSync } from 'fs';
import gremlin from 'gremlin';
import createVertex from './crud/create-vertex';
import updateVertex from './crud/update-vertext';

const start = async () => {
    const traversal = gremlin.process.AnonymousTraversalSource.traversal;
    const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
    //const authenticator = new gremlin.driver.auth.PlainTextSaslAuthenticator('root', 'admin');
    const g = traversal().withRemote(new DriverRemoteConnection('ws://localhost:8182/gremlin'));

    //Bulk upload data
    try {
        const bulkReadResult = await g.io('TinkerGraph.json').read().iterate();
        console.log(`Bulk read complete with message: ${bulkReadResult}`)        ;
    } catch (error) {
        console.log(`Error while doing bulk operation with message: ${error}`)
    }


    //Example read
    try {
        const names = await g.V().hasLabel('person').values('name').toList();
        console.log(names);
    }
    catch (error) {
        console.log(error);
    }

    //Create Vertex
    let createdId: number = 0;
    try {
        const createRes = await createVertex(g, 'someLabel');
        createdId = createRes.id;
        const properties = await g.V(createdId).properties().toList();
        console.log(`Create Result: ${createRes}, with properties: ${properties}`);
    } catch (error) {
        console.log(error);
    }

    //Update Vertex
    try {
        const updateRes = await updateVertex(g, createdId, 'name', 'new name');
        const properties = await g.V(createdId).properties().toList();
        console.log(`Update Result: ${updateRes}, with properties: ${properties}`);
    } catch (error) {
        console.log(error);
    }
}

start();