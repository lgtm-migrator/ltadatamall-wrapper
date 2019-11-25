//
// Copyright 2019 AppRExp
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-Short-Identifier: Apache-2.0
//

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
