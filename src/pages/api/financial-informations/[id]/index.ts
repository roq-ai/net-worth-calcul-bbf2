import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { financialInformationValidationSchema } from 'validationSchema/financial-informations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.financial_information
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFinancialInformationById();
    case 'PUT':
      return updateFinancialInformationById();
    case 'DELETE':
      return deleteFinancialInformationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialInformationById() {
    const data = await prisma.financial_information.findFirst(
      convertQueryToPrismaUtil(req.query, 'financial_information'),
    );
    return res.status(200).json(data);
  }

  async function updateFinancialInformationById() {
    await financialInformationValidationSchema.validate(req.body);
    const data = await prisma.financial_information.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFinancialInformationById() {
    const data = await prisma.financial_information.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
