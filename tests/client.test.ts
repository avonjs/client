import Client from '../src/Client';

const client = new Client({});

describe('client api call', () => {
  it('can create a user', async () => {
    await client.createUser({
      username: 'username',
    });
  });
});
