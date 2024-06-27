import { t, Static } from "elysia"

export const bodySchema = t.Object({
    content: t.String()
})

export type TBody = Static<typeof bodySchema>

export interface INote {
    id: number;
    content: string;
}