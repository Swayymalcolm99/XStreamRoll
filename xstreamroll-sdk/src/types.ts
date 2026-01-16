export interface StreamConfig {
  apiUrl?: string
  clientId?: string
}

export interface StreamEvent {
  streamId: string
  data: Record<string, any>
  eventType?: string
}
