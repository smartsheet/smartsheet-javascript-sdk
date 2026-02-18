/**
 * Airport Route Finder
 *
 * Determines if there is a route between any two airports given a list of
 * airports and their connections. Uses graph traversal (BFS) to find paths.
 */

/**
 * Represents an airport graph for route finding
 */
export class AirportGraph {
    airports: Set<string>;
    adjacencyList: Map<string, string[]>;

    /**
     * Creates an airport graph
     * @param airports - List of airport codes
     * @param connections - List of connections as [from, to] pairs
     */
    constructor(airports: string[], connections: [string, string][]) {
        this.airports = new Set(airports);
        this.adjacencyList = new Map();

        // Initialize adjacency list for all airports
        for (const airport of airports) {
            this.adjacencyList.set(airport, []);
        }

        // Add connections (bidirectional by default)
        for (const [from, to] of connections) {
            if (this.airports.has(from) && this.airports.has(to)) {
                this.adjacencyList.get(from)?.push(to);
                this.adjacencyList.get(to)?.push(from);
            }
        }
    }

    /**
     * Checks if a route exists between two airports using BFS
     * @param start - Starting airport code
     * @param end - Destination airport code
     * @returns True if a route exists, false otherwise
     */
    hasRoute(start: string, end: string): boolean {
        if (!this.airports.has(start) || !this.airports.has(end)) {
            return false;
        }

        if (start === end) {
            return true;
        }

        const visited = new Set<string>();
        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = this.adjacencyList.get(current) || [];

            for (const neighbor of neighbors) {
                if (neighbor === end) {
                    return true;
                }

                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return false;
    }

    /**
     * Finds the shortest path between two airports using BFS
     * @param start - Starting airport code
     * @param end - Destination airport code
     * @returns Array of airport codes representing the path, or null if no path exists
     */
    findPath(start: string, end: string): string[] | null {
        if (!this.airports.has(start) || !this.airports.has(end)) {
            return null;
        }

        if (start === end) {
            return [start];
        }

        const visited = new Set<string>();
        const queue: string[][] = [[start]];
        visited.add(start);

        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];
            const neighbors = this.adjacencyList.get(current) || [];

            for (const neighbor of neighbors) {
                if (neighbor === end) {
                    return [...path, neighbor];
                }

                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path, neighbor]);
                }
            }
        }

        return null;
    }

    /**
     * Gets all airports reachable from a given airport
     * @param airport - Starting airport code
     * @returns Array of reachable airport codes
     */
    getReachableAirports(airport: string): string[] {
        if (!this.airports.has(airport)) {
            return [];
        }

        const visited = new Set<string>();
        const queue = [airport];
        visited.add(airport);

        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = this.adjacencyList.get(current) || [];

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        // Remove the starting airport from the result
        visited.delete(airport);
        return Array.from(visited);
    }

    /**
     * Checks if all airports are connected (single component)
     * @returns True if all airports are connected
     */
    isFullyConnected(): boolean {
        if (this.airports.size === 0) {
            return true;
        }

        const firstAirport = this.airports.values().next().value as string;
        const reachable = this.getReachableAirports(firstAirport);

        return reachable.length === this.airports.size - 1;
    }
}

// Sample data: 15 airports with connections
export const SAMPLE_AIRPORTS: string[] = [
    'JFK', // New York
    'LAX', // Los Angeles
    'ORD', // Chicago
    'DFW', // Dallas
    'DEN', // Denver
    'ATL', // Atlanta
    'SFO', // San Francisco
    'SEA', // Seattle
    'MIA', // Miami
    'BOS', // Boston
    'PHX', // Phoenix
    'IAH', // Houston
    'MSP', // Minneapolis
    'DTW', // Detroit
    'LAS', // Las Vegas
];

export const SAMPLE_CONNECTIONS: [string, string][] = [
    ['JFK', 'LAX'],
    ['JFK', 'ORD'],
    ['JFK', 'ATL'],
    ['JFK', 'BOS'],
    ['JFK', 'MIA'],
    ['LAX', 'SFO'],
    ['LAX', 'SEA'],
    ['LAX', 'DEN'],
    ['LAX', 'PHX'],
    ['LAX', 'LAS'],
    ['ORD', 'DEN'],
    ['ORD', 'MSP'],
    ['ORD', 'DTW'],
    ['DFW', 'IAH'],
    ['DFW', 'ATL'],
    ['DFW', 'DEN'],
    ['ATL', 'MIA'],
    ['SEA', 'SFO'],
    ['DEN', 'LAS'],
    ['BOS', 'DTW'],
];

/**
 * Demo function showing the airport route finder in action
 */
export function runDemo(): void {
    console.log('=== Airport Route Finder Demo ===\n');
    console.log('Airports:', SAMPLE_AIRPORTS.join(', '));
    console.log('\nConnections:');
    SAMPLE_CONNECTIONS.forEach(([from, to]) => console.log(`  ${from} <-> ${to}`));

    const graph = new AirportGraph(SAMPLE_AIRPORTS, SAMPLE_CONNECTIONS);

    // Test various routes
    const testCases: [string, string][] = [
        ['JFK', 'LAS'], // Should find route: JFK -> LAX -> LAS
        ['BOS', 'SEA'], // Should find route: BOS -> JFK -> LAX -> SEA
        ['MIA', 'MSP'], // Should find route through multiple hops
        ['JFK', 'JFK'], // Same airport
    ];

    console.log('\n=== Route Tests ===\n');

    for (const [start, end] of testCases) {
        const hasRoute = graph.hasRoute(start, end);
        const path = graph.findPath(start, end);

        console.log(`Route from ${start} to ${end}:`);
        console.log(`  Exists: ${hasRoute}`);
        if (path) {
            console.log(`  Path: ${path.join(' -> ')}`);
        }
        console.log();
    }

    console.log('=== Reachability ===\n');
    console.log('Airports reachable from JFK:', graph.getReachableAirports('JFK').join(', '));
    console.log('\nIs the network fully connected?', graph.isFullyConnected());
}
