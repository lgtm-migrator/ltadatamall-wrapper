import axios, { AxiosResponse } from 'axios';
import express from 'express';
import helmet from 'helmet';
import https from 'https';

export async function main(): Promise<void> {
    const app = express();
    const ltaDatamallBaseURL = new URL('http://datamall2.mytransport.sg/');
    const SSLKey = process.env.SSL_KEY;
    const SSLCert = process.env.SSL_CERT;
    const port = process.env.PORT;

    app.use(helmet());

    app.get('*', async (req, res, next): Promise<void> => {
        let dmResponse: AxiosResponse;

        try {
            dmResponse = await axios.get(
                new URL(req.path, ltaDatamallBaseURL).href, {
                    headers: req.headers,
                }
            );
        }
        catch (err) {
            Promise.reject(err);
        }

        // dmResponse.headers.keys.forEach((key: string) => {
        //     res.setHeader(key, dmResponse.headers[key]);
        // });

        res.status(dmResponse.status).send(dmResponse.data)

        next();
    });

    if (SSLKey && SSLCert) {
        https.createServer({
            key: SSLKey,
            cert: SSLCert,
        }, app).listen(port || 443, () => {
            console.log(`Application listening on port ${port || '443'}, HTTPS.`);
        });
    }
    else {
        app.listen(port || 80, () => {
            console.log(`Application listening on port ${port || '80'}, HTTP.`);
        });
    }
}
