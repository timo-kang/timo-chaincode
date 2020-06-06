import { Context, Contract } from 'fabric-contract-api';
import { ClientIdentity } from 'fabric-shim';

export class GoonoContract extends Contract {
    constructor() {
        super('GoonoContract');
    }

    public async newVersion(ctx: Context, version: string) {
        await ctx.stub.putState(
            'Version',
            Buffer.from(JSON.stringify({ version }))
        );
        console.info(`============== VERSION : ${version}`);
    }

    public async newNote(ctx: Context, id: string, hash: string, url: string, UserId: string, timestamp: string) {
        const noteKey = ctx.stub.createCompositeKey('Note', [id]);
        const noteObj = { id, UserId, url, hash, timestamp, docType: 'Note' };
        const noteVal = Buffer.from(JSON.stringify(noteObj));
        await ctx.stub.putState(noteKey, noteVal);
        console.info('============= END : new note ===========');
        return JSON.stringify(noteObj);
    }

    public async newUser(ctx: Context, id: string, platform: string, email: string, name: string, etc: string) {
        const userKey = ctx.stub.createCompositeKey('User', [platform, email]);
        const userObj = { id, platform, email, name, etc, docType: 'User' };
        const userVal = Buffer.from(JSON.stringify(userObj));
        await ctx.stub.putState(userKey, userVal);
        console.info(`============= END : new User[${userKey}] ===========`);
        return JSON.stringify(userObj);
    }

    public async getUser(ctx: Context, platform: string, email: string) {
        console.info('============= START : check User ===========');
        const userKey = ctx.stub.createCompositeKey('User', [platform, email]);
        const user = await ctx.stub.getState(userKey);
        console.info(`============= END : check User[${userKey}] ===========`);
        return user ? user.toString() : '';
    }

    public async newProject(ctx: Context, id: string, owner: string, name: string) {
        console.info('============= START : new Project ===========');
        const projectKey = ctx.stub.createCompositeKey('Project', [owner, id]);
        const projectObj = { id, name, owner, docType: 'Project' };
        const projectVal = Buffer.from(JSON.stringify(projectObj));
        await ctx.stub.putState(projectKey, projectVal);
        console.info(`============= END : new Project[${projectKey}] ===========`);
        return JSON.stringify(projectObj);
    }
}