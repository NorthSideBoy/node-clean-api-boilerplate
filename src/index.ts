import "reflect-metadata";
import { env } from "./config/env.config";
import createServer from "./interfaces/express/server";

const start = async (): Promise<void> => {
  try {
    const app = await createServer();

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
