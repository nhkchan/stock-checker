import { StockCheck } from "../models/stock-check.model";
import { StockCheckResponse } from "../models/stock-check-response.model"
import https = require('https');

export class StockCheckerService {

    // https://www.bestbuy.ca/ecomm-api/availability/products

    environment: any = null;

    constructor(env: any) {
        this.environment = env;
    }

    public checkStock(check: StockCheck): Promise<StockCheckResponse> {

        let apiUrl: URL = new URL(this.env().BESTBUY_ENDPOINT);
    
        apiUrl.searchParams.append('accept', 'application/vnd.bestbuy.simpleproduct.v1+json');
        apiUrl.searchParams.append('accept-language', 'en-CA');
        apiUrl.searchParams.append('locations', check.locations.join('|'));
        apiUrl.searchParams.append('skus', check.skus.join('|'));
    
        console.log(apiUrl);
    
        let options: any = {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
                "content-type": "application/json"
            },
            method: 'GET',
            port: 443
        };
    
        console.log(apiUrl.toString());
    
        return this.httpRequest(apiUrl, options)
        // .then((res: StockCheckResponse) => {
        //     console.log(res);
        //     console.log(res.availabilities.length);
        // }, (rej) => {
        //     console.log(rej);
        // });
    
    }

    private env() {
        return this.environment;
    }

    public httpRequest(apiUrl, options): Promise<StockCheckResponse> {
        return new Promise(function(resolve, reject) {
            var req = https.request(apiUrl.toString(), options, (res: any) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
                // console.log(res);
        
                var body = [];
        
                res.on('data', (chunk) => {
                    body.push(chunk);
                });
        
                res.on('end', () => {
                    try {
                        const data: StockCheckResponse = JSON.parse(Buffer.concat(body).toString().trim());
                        // Write back something interesting to the user:
                        resolve(data);
                      } catch (er) {
                        // uh oh! bad json!
                        console.log(`error: ${er.message}`);
                        reject(er);
                      }
                })
        
            });
    
            // reject on request error
            req.on('error', function(err) {
                // This is not a "Second reject", just a different sort of failure
                reject(err);
            });
            // IMPORTANT
            req.end();
    
            // on request error, reject
            // if there's post data, write it to the request
            // important: end the request req.end()
        });
    }

}