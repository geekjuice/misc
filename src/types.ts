export interface Parameters {
  [flag: string]: unknown;
}

export interface Action {
  action: (parameters: Parameters) => void | Promise<void>;
  description?: string;
}

export interface Actions {
  [action: string]: Action;
}

export interface Command {
  alias?: string;
  command: () => void | Promise<void>;
  description?: string;
  todos?: string[];
}

export interface Commands {
  aliases: {
    [alias: string]: string;
  };
  commands: {
    [file: string]: Command;
  };
}

export interface Option {
  alias?: string;
  description?: string;
  choices?: string[];
  default?: string | number | boolean;
  type?: string;
}

export interface Options {
  [flag: string]: Option;
}
