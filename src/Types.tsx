export type Story = {
    title: string;
    version: string;
    chatgpt: string[];
    claude: string[];
    gemini: string[];
    copilot: string[];
    prompt: string[];
    totalcount: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }
