export interface Repository<T> {
    findById: (id: string) => Promise< T | null>

    save: (data: T) => Promise<T | null>;
}