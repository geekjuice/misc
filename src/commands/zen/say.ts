import cowsay from 'cowsay';
import yosay from 'yosay';

type Say = (text: string) => string;

export const yo: Say = (text: string): string => yosay(text);

export const cow: Say = (text: string): string => cowsay.say({ text });
