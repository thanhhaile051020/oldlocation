export interface SkillService {
    loadData(key: string): Promise<any>;
    getAllSkill(): Promise<any>;
}
