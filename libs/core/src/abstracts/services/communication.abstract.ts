export abstract class CommunicationAbstract {
  abstract internal: InternalCommunicationAbstract<unknown>;
  abstract external: ExternalCommunicationAbstract;
}

class InternalCommunicationAbstract<T> {
  kafka?: unknown;
  grpc?: GrpcCommunicationParticipants<T>;
}

type GrpcCommunicationParticipants<T> = {
  [key in keyof T]: keyof T[key];
};

class ExternalCommunicationAbstract {}
