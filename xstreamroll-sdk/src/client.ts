import axios from "axios"
import type { StreamEvent, StreamConfig } from "./types"

export class StreamingClient {
  private apiUrl: string
  private clientId: string

  constructor(config: StreamConfig) {
    this.apiUrl = config.apiUrl || "http://localhost:3001"
    this.clientId = config.clientId || `client-${Date.now()}`
  }

  async publishEvent(event: StreamEvent): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/streams/events`, {
        clientId: this.clientId,
        ...event,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Failed to publish event:", error)
      throw error
    }
  }

  async getStreamStatus(streamId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/streams/${streamId}`)
      return response.data
    } catch (error) {
      console.error("Failed to get stream status:", error)
      throw error
    }
  }
}
