import * as vscode from 'vscode';
import * as https from 'https';

export class ProjectUploader {
    private readonly _options: https.RequestOptions;

    constructor() {
        let rejectUnauthorized = <boolean>vscode.workspace.getConfiguration('3d2p').get('strictSSL');
        rejectUnauthorized = <string>vscode.workspace.getConfiguration('3d2p').get('apiEndpoint') === 'localhost'
            ? false
            : true;
        this._options = {
            host : <string>vscode.workspace.getConfiguration('3d2p').get('apiEndpoint'),
            port : <number>vscode.workspace.getConfiguration('3d2p').get('apiPort'),
            rejectUnauthorized: rejectUnauthorized
        };
    }
    
    public async remoteExists(repositoryUrl: string, rawRepositoryUrl: string): Promise<boolean> {        
        this._options.path =  `/api/projects/remoteExists?`
            + `repositoryUrl=${encodeURIComponent(repositoryUrl)}`
            + `&rawRepositoryUrl=${encodeURIComponent(rawRepositoryUrl)}`;
        this._options.method = 'GET';

        return new Promise<boolean>((resolve, reject) => {
            let req = https.request(this._options, function(res) {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {                            
                    if(res.statusCode !== 200) {
                        reject();
                    } else {
                        resolve(JSON.parse(data).result);
                    }                    
                });
            });        
            req.end();
            req.on('error', function(e) {
                reject(e);
            });
        });
    }
    
    public uploadProject(repositoryUrl: string, rawRepositoryUrl: string): Promise<string> {
        this._options.path =  `/api/projects?`
            + `repositoryUrl=${encodeURIComponent(repositoryUrl)}`
            + `&rawRepositoryUrl=${encodeURIComponent(rawRepositoryUrl)}`;
        this._options.method = 'POST';

        return new Promise<string>((resolve, reject) => {
            let req = https.request(this._options, function(res) {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {                            
                    if(res.statusCode !== 200) {
                        reject();
                    } else {
                        resolve(JSON.parse(data).shortId);
                    }                    
                });
            });        
            req.end();
            req.on('error', function(e) {
                reject(e);
            });
        });
    }
}