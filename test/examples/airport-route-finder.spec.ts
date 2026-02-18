import { AirportGraph, SAMPLE_AIRPORTS, SAMPLE_CONNECTIONS } from '../../examples/airport-route-finder/index';

describe('AirportGraph', () => {
    describe('constructor', () => {
        it('should create a graph with airports and connections', () => {
            const airports = ['JFK', 'LAX', 'ORD'];
            const connections: [string, string][] = [
                ['JFK', 'LAX'],
                ['LAX', 'ORD'],
            ];
            const graph = new AirportGraph(airports, connections);

            expect(graph.airports.size).toBe(3);
        });

        it('should ignore connections with invalid airports', () => {
            const airports = ['JFK', 'LAX'];
            const connections: [string, string][] = [['JFK', 'INVALID']];
            const graph = new AirportGraph(airports, connections);

            expect(graph.adjacencyList.get('JFK')).toEqual([]);
        });
    });

    describe('hasRoute', () => {
        const airports = ['JFK', 'LAX', 'ORD', 'DEN', 'SFO'];
        const connections: [string, string][] = [
            ['JFK', 'LAX'],
            ['LAX', 'ORD'],
            ['ORD', 'DEN'],
        ];
        const graph = new AirportGraph(airports, connections);

        it('should return true for directly connected airports', () => {
            expect(graph.hasRoute('JFK', 'LAX')).toBe(true);
        });

        it('should return true for indirectly connected airports', () => {
            expect(graph.hasRoute('JFK', 'DEN')).toBe(true);
        });

        it('should return true for same airport', () => {
            expect(graph.hasRoute('JFK', 'JFK')).toBe(true);
        });

        it('should return false for disconnected airports', () => {
            expect(graph.hasRoute('JFK', 'SFO')).toBe(false);
        });

        it('should return false for invalid airports', () => {
            expect(graph.hasRoute('JFK', 'INVALID')).toBe(false);
            expect(graph.hasRoute('INVALID', 'LAX')).toBe(false);
        });
    });

    describe('findPath', () => {
        const airports = ['JFK', 'LAX', 'ORD', 'DEN', 'SFO'];
        const connections: [string, string][] = [
            ['JFK', 'LAX'],
            ['LAX', 'ORD'],
            ['ORD', 'DEN'],
        ];
        const graph = new AirportGraph(airports, connections);

        it('should find path for directly connected airports', () => {
            const path = graph.findPath('JFK', 'LAX');
            expect(path).toEqual(['JFK', 'LAX']);
        });

        it('should find path for indirectly connected airports', () => {
            const path = graph.findPath('JFK', 'DEN');
            expect(path).toEqual(['JFK', 'LAX', 'ORD', 'DEN']);
        });

        it('should return single airport for same start and end', () => {
            const path = graph.findPath('JFK', 'JFK');
            expect(path).toEqual(['JFK']);
        });

        it('should return null for disconnected airports', () => {
            const path = graph.findPath('JFK', 'SFO');
            expect(path).toBeNull();
        });

        it('should return null for invalid airports', () => {
            expect(graph.findPath('JFK', 'INVALID')).toBeNull();
            expect(graph.findPath('INVALID', 'LAX')).toBeNull();
        });

        it('should find shortest path', () => {
            // Create a graph with multiple paths
            const airports2 = ['A', 'B', 'C', 'D'];
            const connections2: [string, string][] = [
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D'],
                ['A', 'D'], // Direct connection
            ];
            const graph2 = new AirportGraph(airports2, connections2);
            const path = graph2.findPath('A', 'D');
            expect(path).toEqual(['A', 'D']); // Should find direct route
        });
    });

    describe('getReachableAirports', () => {
        const airports = ['JFK', 'LAX', 'ORD', 'SFO', 'DEN'];
        const connections: [string, string][] = [
            ['JFK', 'LAX'],
            ['LAX', 'ORD'],
            ['SFO', 'DEN'], // Separate component
        ];
        const graph = new AirportGraph(airports, connections);

        it('should return all reachable airports', () => {
            const reachable = graph.getReachableAirports('JFK');
            expect(reachable.sort()).toEqual(['LAX', 'ORD']);
        });

        it('should not include starting airport', () => {
            const reachable = graph.getReachableAirports('JFK');
            expect(reachable).not.toContain('JFK');
        });

        it('should return empty array for invalid airport', () => {
            const reachable = graph.getReachableAirports('INVALID');
            expect(reachable).toEqual([]);
        });

        it('should return empty array for isolated airport', () => {
            const isolatedGraph = new AirportGraph(['JFK'], []);
            const reachable = isolatedGraph.getReachableAirports('JFK');
            expect(reachable).toEqual([]);
        });
    });

    describe('isFullyConnected', () => {
        it('should return true for fully connected graph', () => {
            const airports = ['JFK', 'LAX', 'ORD'];
            const connections: [string, string][] = [
                ['JFK', 'LAX'],
                ['LAX', 'ORD'],
            ];
            const graph = new AirportGraph(airports, connections);
            expect(graph.isFullyConnected()).toBe(true);
        });

        it('should return false for disconnected graph', () => {
            const airports = ['JFK', 'LAX', 'ORD', 'SFO'];
            const connections: [string, string][] = [
                ['JFK', 'LAX'],
                ['ORD', 'SFO'],
            ];
            const graph = new AirportGraph(airports, connections);
            expect(graph.isFullyConnected()).toBe(false);
        });

        it('should return true for empty graph', () => {
            const graph = new AirportGraph([], []);
            expect(graph.isFullyConnected()).toBe(true);
        });

        it('should return true for single airport', () => {
            const graph = new AirportGraph(['JFK'], []);
            expect(graph.isFullyConnected()).toBe(true);
        });
    });

    describe('with sample data', () => {
        const graph = new AirportGraph(SAMPLE_AIRPORTS, SAMPLE_CONNECTIONS);

        it('should have all 15 airports', () => {
            expect(graph.airports.size).toBe(15);
        });

        it('should find route from JFK to LAS', () => {
            expect(graph.hasRoute('JFK', 'LAS')).toBe(true);
            const path = graph.findPath('JFK', 'LAS');
            expect(path).not.toBeNull();
            expect(path[0]).toBe('JFK');
            expect(path[path.length - 1]).toBe('LAS');
        });

        it('should find route from BOS to SEA', () => {
            expect(graph.hasRoute('BOS', 'SEA')).toBe(true);
        });

        it('should find route from MIA to MSP', () => {
            expect(graph.hasRoute('MIA', 'MSP')).toBe(true);
        });

        it('should verify network is fully connected', () => {
            expect(graph.isFullyConnected()).toBe(true);
        });
    });
});
