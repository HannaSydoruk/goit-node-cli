import * as contactsService from "./contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return allContacts;


    case "get":
      const oneContact = await contactsService.getContactById(id);
      return oneContact;


    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return newContact;



    case "remove":
      const removeContact = await contactsService.removeContact(id)
      return removeContact;


    default:
      console.warn("\x1B[31m Unknown action type!");
      return Promise.reject();
  }
}

const result = invokeAction(options);
result.then((r) => {
  console.log(r);
})
  .catch(() => { });
