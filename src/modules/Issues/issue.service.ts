import type { IIssue } from "./issue.interface.js";
import { pool } from "../../db/index.js";

const Create_Issue = async (payload: IIssue, userId: number) => {
  const { title, description, type } = payload;
  const user = await pool.query(
    `
            SELECT id
            FROM users
            WHERE id=$1
        `,
    [userId],
  );

  if (user.rows.length === 0) {
    throw new Error("Reporter not found");
  }
  const result = await pool.query(
    `
        INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *
        `,
    [title, description, type, userId],
  );

  return result.rows[0];
};

const Get_All_Issues = async () => {};

const Get_Single_Issue = async (issueId: string) => {
  const issueResult = await pool.query(
    `

            SELECT *

            FROM issues

            WHERE id = $1

            `,

    [issueId],
  );
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  const userResult = await pool.query(
    `
    SELECT

        id,name,role FROM users
        WHERE id=$1

     `,
    [issue.reporter_id],
  );

  if (userResult.rows.length === 0) {
    throw new Error("Reporter not found");
  }

  const reporter = userResult.rows[0];
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const issueService = {
  Create_Issue,
  Get_All_Issues,
  Get_Single_Issue,
};
