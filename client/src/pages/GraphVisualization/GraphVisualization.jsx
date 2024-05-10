import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import cyCanvas from "cytoscape-canvas";

// Register cytoscape-canvas
cytoscape.use(cyCanvas);

const GraphVisualization = ({
    coordinates,
    edges,
    sourceNodeId,
    targetNodeId,
    setShortestRoute,
    setShortestRouteCost,
    shortestRoute,
    shortestRouteCost
}) => {
    // const [shortestRoute, setShortestRoute] = useState("");
    // const [shortestRouteCost, setShortestRouteCost] = useState(0);
    // let totalCost = 0;
    useEffect(() => {
        const cy = cytoscape({
            container: document.getElementById('cy'), // Use an existing div with id 'cy' as the container
            elements: {
                nodes: coordinates.map(({ id, x, y }) => ({ data: { id }, position: { x, y } })),
                edges: edges.map(({ source, target, label, cost }) => ({ data: { id: `${source}-${target}`, source, target, label, cost } })) // Include 'cost' attribute
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(id)',
                        'background-color': '#ccc'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'label': 'data(label)',
                        'curve-style': 'bezier',
                        // 'target-arrow-shape': 'triangle',
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc'
                    }
                },
                {
                    selector: '.highlighted',
                    style: {
                        'line-color': '#f00',
                        'target-arrow-color': '#f00',
                        'transition-property': 'line-color, target-arrow-color',
                        'transition-duration': '0.5s'
                    }
                }
            ],
            layout: {
                name: 'preset'
            },
            styleEnabled: true
        });
        const sourceNode = cy.$(`node[id='${sourceNodeId}']`);
        const targetNode = cy.$(`node[id='${targetNodeId}']`);

        const dijkstraPath = cy.elements().dijkstra(sourceNode, edge => edge.data('cost')).pathTo(targetNode);
        console.log('Dijkstra Path:', dijkstraPath);

        let totalCost = 0;
        const shortestEdges = [];
        dijkstraPath.forEach(ele => {
            if (ele.isEdge()) {
                ele.addClass('highlighted');
                shortestEdges.push(ele);
                totalCost += ele.data('cost');
            }
        });
        console.log('Shortest Edges:', shortestEdges);
        console.log('Total Cost:', totalCost);

        const shortestRoute = shortestEdges.map(edge => edge.data('label')).join(' -> ');
        console.log('Shortest Route:', shortestRoute);
        setShortestRoute(shortestRoute);
        setShortestRouteCost(totalCost);

        // Cleanup function to destroy the cytoscape instance
        return () => {
            cy.destroy();
        };
        // Rest of the useEffect...
    }, [coordinates, edges, sourceNodeId, targetNodeId]);

    return (
        <div>
            <div id="cy" style={{ width: "100%", height: "400px" }}></div>
            <div>
                Shortest Route: {shortestRoute}, Total Path: {shortestRouteCost} km
            </div>
        </div>
    );
};

export default GraphVisualization;
