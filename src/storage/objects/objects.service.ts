import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  OBJECTS_SERVICE_NAME,
  ObjectsClient,
  ObjectInfo,
  ObjectData,
  ObjectLocation,
  PutObjectRequest,
  CopyObjectRequest,
} from 'proto/storage';

/**
 * Service: Objects
 */
@Injectable()
export class ObjectsService implements OnModuleInit {
  /**
   * Objects service client
   * @private
   */
  private objectsClient: ObjectsClient;

  /**
   * Constructor
   * @param storagePackage  Injected instance of gRPC client for storage microservice
   */
  constructor(@Inject('STORAGE_PACKAGE') private readonly storagePackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.objectsClient = this.storagePackage.getService<ObjectsClient>(OBJECTS_SERVICE_NAME);
  }

  /**
   * Put object into the storage
   * @param request PutObjectRequest
   */
  async put(request: PutObjectRequest): Promise<ObjectInfo> {
    const res$ = this.objectsClient.put(request);
    return lastValueFrom(res$);
  }

  /**
   * Head object
   * @param request ObjectLocation
   */
  async head(request: ObjectLocation): Promise<ObjectInfo> {
    const res$ = this.objectsClient.head(request);
    return lastValueFrom(res$);
  }

  /**
   * Get object
   * @param request ObjectLocation
   */
  async get(request: ObjectLocation): Promise<ObjectData> {
    const res$ = this.objectsClient.get(request);
    return lastValueFrom(res$);
  }

  /**
   * Delete object
   * @param request ObjectLocation
   */
  async delete(request: ObjectLocation): Promise<void> {
    const empty$ = this.objectsClient.delete(request);
    await lastValueFrom(empty$);
  }

  /**
   * Copy object to another location
   * @param request CopyObjectRequest
   */
  async copy(request: CopyObjectRequest): Promise<ObjectInfo> {
    const res$ = this.objectsClient.copy(request);
    return lastValueFrom(res$);
  }
}
