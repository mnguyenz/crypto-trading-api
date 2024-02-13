export class Bootstrap {
    private app: NestExpressApplication;

    async start(): Promise<void> {
        this.app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
        await this.app.startAllMicroservices();
        await this.app.listen(env.APP_PORT);
    }
}
