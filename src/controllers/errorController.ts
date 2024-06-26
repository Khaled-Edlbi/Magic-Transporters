import { Response } from 'express'


type errorControllerProps = {
  apiController: () => Promise<Response<Record<string, unknown>> | void>;
  res: Response<Record<string, unknown>>;
};


async function errorController({ apiController, res }: errorControllerProps) {
  try {
    return await apiController();

  } catch(error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });

    } else {
      console.log('Unexpected error:', error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default errorController