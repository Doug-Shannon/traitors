import { Record } from 'immutable';

export interface IConfiguration {
  numberOfPlayers?: number;
}

const ConfigurationFactory = Record({
  numberOfPlayers: 0
});

export class Configuration extends ConfigurationFactory implements IConfiguration {
  constructor(config: Partial<IConfiguration>) {
    super(config);
  }
}
