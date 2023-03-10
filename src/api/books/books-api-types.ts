type BaseBookType = {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  categories: string[] | null;
  id: number;
  booking: {
    id: number;
    order: boolean;
    dateOrder: Date | null;
    customerId: number | null;
    customerFirstName: string | null;
    customerLastName: string | null;
  } | null;
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: Date | null;
    dateHandedTo: Date | null;
    recipientId: number | null;
    recipientFirstName: string | null;
    recipientLastName: string | null;
  } | null;
  histories:
    | [
        {
          id: number | null;
          userId: number | null;
        }
      ]
    | null;
};
export type BookCardType = BaseBookType & {
  image: {
    url: string | null;
  } | null;
};
export type BookType = BaseBookType & {
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  images:
    | [
        {
          url: string | null;
        }
      ]
    | null;
  comments:
    | [
        {
          id: number | null;
          rating: number;
          text: string | null;
          createdAt: Date;
          user: {
            commentUserId: number;
            firstName: string;
            lastName: string;
            avatarUrl: string | null;
          };
        }
      ]
    | null;
};
export type CategoryType = {
  name: string;
  path: string;
  id: number;
};
