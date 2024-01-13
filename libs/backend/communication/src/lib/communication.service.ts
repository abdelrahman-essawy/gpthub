import { Injectable } from '@nestjs/common';
import { CommunicationAbstract } from '../../../../core/src/abstracts/services/communication.abstract';

@Injectable()
export class CommunicationService implements CommunicationAbstract {
  internal: InternalCommunicationAbstract<unknown>;
  external: ExternalCommunicationAbstract;
}
