import superjson from 'superjson';

/**
 * Utility functions for serializing and deserializing data using SuperJSON
 * Handles complex data types like Date, Map, Set, BigInt, etc.
 */
export const serializer = {
  /**
   * Serialize data to a string that can be safely passed between client and server
   */
  serialize: <T>(data: T): string => {
    return superjson.stringify(data);
  },

  /**
   * Deserialize data back to its original form including complex types
   */
  deserialize: <T>(serializedData: string): T => {
    return superjson.parse(serializedData);
  },
};
