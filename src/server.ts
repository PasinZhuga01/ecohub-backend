import 'module-alias/register';
import env from '@config/env';

import app from './app';

app.listen(env.port, () => console.log(`Server is running on port ${env.port}`));
