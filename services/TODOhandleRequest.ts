// TODO: make global request handler

// import { supabase } from "./supabaseClient";
// import { Operation, Table } from "./types";

// enum Table {
//     tasks = "tasks",
//   }

//   enum Operation {
//     select = "select",
//     insert = "insert",
//     update = "update",
//     delete = "delete",
//   }

// const handleRequest = async <T>(
//   table: Table,
//   operation: Operation,
//   payload?: Partial<T>,
//   elementId?: string
// ) => {
//   try {
//     let response;

//     switch (operation) {
//       case Operation.insert: {
//         response = await supabase.from(table).insert(payload).select();
//         break;
//       }

//       case Operation.update: {
//         response = await supabase
//           .from(table)
//           .update(payload)
//           .eq("id", elementId);
//         break;
//       }

//       case Operation.delete: {
//         console.log("table: ", table);
//         console.log("operation: ", operation);
//         console.log("payload: ", payload);
//         console.log("elementId: ", elementId);

//         response = await supabase.from(table).delete().eq("id", elementId);
//         break;
//       }

//       default:
//         break;
//     }

//     if (!response) {
//       throw new Error("Operation don't found or no supabase response");
//     }

//     const { data, error } = response;

//     if (error) {
//       throw new Error(`Supabase error: ${error.message}`);
//     }

//     return data as T;
//   } catch (error) {
//     console.error(
//       `Operation: "${operation}" error for table: "${table}": ${error}`
//     );
//   }
// };

// export default handleRequest;
