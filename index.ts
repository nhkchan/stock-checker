import { UtilService } from './util/util.service';
import { StockCheckerService } from './service/stock-checker.service';
import { StockCheckResponse } from './models/stock-check-response.model';


export class Handler {

    envVars = null;

    public async handle(event: any = {}, context: any = {}): Promise<any> {

        const util: UtilService = new UtilService();
        const stockCheckerSvc: StockCheckerService = new StockCheckerService(process.env);
    
        // console.log('## ENVIRONMENT VARIABLES: ' + util.serialize(process.env))
        console.log('## CONTEXT: ' + util.serialize(context))
        // console.log('## EVENT: ' + serialize(event))
        // console.log(event.Records);

        if (event.Records.length == 1) {
            let record = event.Records[0];
            await stockCheckerSvc.checkStock(record.body).then((res: StockCheckResponse) => {
                return res.availabilities
            }).then(e => {
                console.log(e.length);
                return {};
            });
        }
        
        // for (let i = 0; i < event.Records.length; i++) {
        //     let record = event.Records[i];
        //     console.log(record.body);
        //     // checkStock(record.body);
        //     stockCheckerSvc.checkStock(record.body).then((res: StockCheckResponse) => {
        //         console.log(res.availabilities.length);
        //         if (i == event.Records.length) {
        //             return {};
        //         }
        //     });

        // }
        // event.Records.forEach(record => {
        //     console.log(record.body);
        //     // checkStock(record.body);
        //     stockCheckerSvc.checkStock(record.body).then((res: StockCheckResponse) => {
        //         console.log(res.availabilities.length);
        //         return {};
        //     });
        // });

        // return {};
    
    }


}

// export const handler = new Handler()
// export const handle = handler.handle;

// let envVars = null;

// export async function handler(event: any = {}, context: any = {}): Promise<any> {

//     const util: UtilService = new UtilService();
//     const stockCheckerSvc: StockCheckerService = new StockCheckerService(env());

//     // console.log('## ENVIRONMENT VARIABLES: ' + util.serialize(process.env))
//     console.log('## CONTEXT: ' + util.serialize(context))
//     // console.log('## EVENT: ' + serialize(event))
//     // console.log(event.Records);

//     event.Records.forEach(record => {
//         console.log(record.body);
//         // checkStock(record.body);
//         stockCheckerSvc.checkStock(record.body).then((res: StockCheckResponse) => {
//             console.log(res.availabilities.length);
//         });
//     })

// }

// var env = function() {
//     if (envVars == null) {
//         envVars = process.env;
//     }
//     return envVars;
// }