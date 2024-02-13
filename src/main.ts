import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startApp(): Promise<void> {
  const bootstrap = new Bootstrap();
}

startApp()
  .then(() => console.log('Init app success'))
  .catch(console.error);
