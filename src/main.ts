import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, LogLevel } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import fastifyHelmet from "@fastify/helmet";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import fastifyCookie from "@fastify/cookie";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: process.env.FASTIFY_LOG === "true" }),
    {
      logger: process.env.LOG_LEVEL?.split(",") as LogLevel[]
    }
  );

  /**
   * @see {@link https://github.com/expressjs/cors#configuration-options}
   */
  app.enableCors({
    origin: process.env.CORS_ACCEPT_ORIGIN?.split(","),
    methods: process.env.CORS_ACCEPT_METHODS?.split(","),
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(","),
    credentials: process.env.CORS_CREDENTIALS === "true"
  });

  // error filter
  app.useGlobalFilters(new AllExceptionsFilter());
  // response wrapper
  app.useGlobalInterceptors(new TransformInterceptor());

  // Helmet
  // @see https://github.com/helmetjs/helmet#how-it-works
  await (app as NestFastifyApplication).register(fastifyHelmet, {
    contentSecurityPolicy: {
     directives: {
       defaultSrc: [`"self"`, "unpkg.com"],
       styleSrc: [
         `"self"`,
         `"unsafe-inline"`,
         "cdn.jsdelivr.net",
         "fonts.googleapis.com",
         "unpkg.com"
       ],
       fontSrc: [`"self"`, "fonts.gstatic.com", "data:"],
       imgSrc: [`"self"`, "data:", "cdn.jsdelivr.net"],
       scriptSrc: [
         `"self"`,
         `https: "unsafe-inline"`,
         `cdn.jsdelivr.net`,
         `"unsafe-eval"`
       ]
     }
   }
  });

  // CSRF Protection
  // @see https://github.com/fastify/csrf-protection#usage
  await (app as NestFastifyApplication).register(fastifyCookie);
  await (app as NestFastifyApplication).register(fastifyCsrfProtection);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(process.env.SERVICE_PORT ?? 3002, "0.0.0.0");

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
