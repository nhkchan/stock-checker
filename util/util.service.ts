export class UtilService {

    public serialize(object: any) {
        return JSON.stringify(object, null, 2);
    }

}