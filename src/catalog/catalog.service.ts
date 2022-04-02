import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, AppClient, ServiceDescriptor } from 'proto/common';

/**
 * Service: Catalog
 */
@Injectable()
export class CatalogService implements OnModuleInit {
  /**
   * App service client
   * @private
   */
  private appClient: AppClient;
  /**
   * Constructor
   * @param catalogPackage  Injected instance of gRPC client for catalog microservice
   */
  constructor(@Inject('CATALOG_PACKAGE') private readonly catalogPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.catalogPackage.getService<AppClient>(APP_SERVICE_NAME);
  }

  /**
   * Hello
   */
  async hello(): Promise<ServiceDescriptor> {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }
}
