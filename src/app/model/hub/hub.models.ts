export enum SignalRHubs {
  Canvas = 'canvas',
  Chat = 'chat',
}

export interface HubConnectionPrereq {
  sketchName: string;
  clientId?: string;
}
