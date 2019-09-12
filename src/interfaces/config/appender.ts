export interface IAppenderConfig {
  type: string;
  levels: string[];
  layout: {
    type: string;
    pattern: string;
  };
}
