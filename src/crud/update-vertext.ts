import { process } from 'gremlin';

/**
     * Update Vertex Properties
     * @param {Number} vertexId Vertex Id
     * @param {String} label Property Label
     * @param {String} value Property Value
     */
const updateVertex = async (g: process.GraphTraversalSource, vertexId: number, label: string, value: string) => {
    // These properties here are not working - it doesn't get added to the vertex. 
    const vertex = await g.V(vertexId).property(process.cardinality.single, label, value).next();
    return vertex.value;
};

export default updateVertex;