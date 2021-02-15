import { process } from 'gremlin';

const { t: { id } } = process;
const { cardinality: { single } } = process;
/**
 * Create a new vertex with Id, Label and properties
 * @param {String} vlabel Vertex Label
 */
const createVertex = async (g: process.GraphTraversalSource, vlabel: string) => {
    const vertex = await g.addV(vlabel)
        .property(process.cardinality.single, 'name', 'Apache')
        .property('lastname', 'Tinkerpop') // default database cardinality
        .next();
    return vertex.value;
};


export default createVertex;