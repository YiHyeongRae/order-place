import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function deleteToDo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("delete todo body.data", req.body);
  db.query(
    `DELETE FROM op_todo WHERE no IN (${req.body.data}) AND user_id="${req.body.user_id}"`,
    function (err: any, result: any) {
      if (err) {
        // console.log("에러는 ?", err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}
