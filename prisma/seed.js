import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  const Messages = [
    {
      chatId: 'df08419d-5beb-4a91-b656-b19bb0c2b677',
      sender: 'model2',
      content: 'Test model message test2',
      time_stamp: '2024-07-29 10:06:00',
    },
    {
      chatId: 'df08419d-5beb-4a91-b656-b19bb0c2b677',
      sender: 'user',
      content: 'Test user message test2',
      time_stamp: '2024-07-29 10:02:00',
    },
    {
      chatId: 'df08419d-5beb-4a91-b656-b19bb0c2b677',
      sender: 'model',
      content: 'Test model message test',
      time_stamp: '2024-07-29 09:01:00',
    },
    {
      chatId: 'df08419d-5beb-4a91-b656-b19bb0c2b677',
      sender: 'user',
      content: 'Test user message test',
      time_stamp: '2024-07-29 09:00:00',
    },
    {
      chatId: 'af9fe460-960b-4f7d-afa1-f6552e591bb6',
      sender: 'model2',
      content: 'model message test2',
      time_stamp: '2024-07-29 10:06:00',
    },
    {
      chatId: 'af9fe460-960b-4f7d-afa1-f6552e591bb6',
      sender: 'user',
      content: 'user message test2',
      time_stamp: '2024-07-29 10:02:00',
    },
    {
      chatId: 'af9fe460-960b-4f7d-afa1-f6552e591bb6',
      sender: 'model',
      content: 'model message test',
      time_stamp: '2024-07-29 09:01:00',
    },
    {
      chatId: 'af9fe460-960b-4f7d-afa1-f6552e591bb6',
      sender: 'user',
      content: 'user message test',
      time_stamp: '2024-07-29 09:00:00',
    },
  ];

  for (const message of Messages) {
    await prisma.message.create({
      data: message,
    });
  }

  Chats;
  const Chats = [
    {
      userId: '8f3c39d9-1fc4-449b-89d3-61bd28cbfced',
      location: 'Vancouver/BC',
      score: 4,
      time_stamp: '2024-07-27 09:00:20',
    },
    {
      userId: 'd52bb537-bc61-43bb-8912-67ede03d2120',
      location: 'Vancouver/BC',
      score: 5,
      time_stamp: '2024-07-28 11:15:10',
    },
  ];

  for (const chat of Chats) {
    await prisma.chat.create({
      data: chat,
    });
  }

  Users;
  const Users = [
    {
      email: 'test@example.com',
      fullName: 'Test User',
      postalCode: 'V6B 4W4',
    },
    {
      email: 'tes2@example.com',
      fullName: 'Test2 User2',
      postalCode: 'V6Z 1K3',
    },
  ];

  for (const user of Users) {
    await prisma.user.create({
      data: user,
    });
  }
};

async function main() {
  try {
    await seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main();
