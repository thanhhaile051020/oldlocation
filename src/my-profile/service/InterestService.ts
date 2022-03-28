export interface InterestService {
    loadData(key: string): Promise<any>;
    getAllInterest(): Promise<any>;
}
