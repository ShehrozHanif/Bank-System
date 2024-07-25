#! /usr/bin/env node

import inquirer from "inquirer";
import { faker, Faker } from "@faker-js/faker";
import Chalk from "Chalk";
// Class Customer

class Customer{
    firstName:string;
    lastName:string;
    age:number;
    gender:string;
    mobileNumber:number;
    accountNumber:number

    constructor(fName:string,lName:string, age:number, gender:string,mobile:number,acc:number){
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobile;
        this.accountNumber = acc;

    }
}


// Interface BankAccount

interface BankAccount{
    accNumber:number,
    balance:number,
}



// class Bank

class Bank{
    customer:Customer[]=[]
    account:BankAccount[]=[]

    addCustomer(obj:Customer){
        this.customer.push(obj)
    }

    addAccountNumber(accObj:BankAccount){
        this.account.push(accObj)
    }

    transacionMethod(accObj:BankAccount){
        let newAccounts = this.account.filter(acc =>acc.accNumber !== accObj.accNumber);
        this.account = [...newAccounts,accObj]
    };
    
}

let MeezanBank = new Bank()
// console.log(MeezanBank)

// let cus = new Customer("Shehroz","Hanif",25,"Male",314,12344)
// console.log(cus)


// Create Auto Customer with loop

for(let i = 1; i<=3; i++){
    let fName = faker.person.firstName("male")
    let lName = faker.person.lastName()
    let num = parseInt('3' + faker.string.numeric(9));

    const cus = new Customer(fName,lName,25+i,"male",num,1000+i)
    MeezanBank.addCustomer(cus)
    MeezanBank.addAccountNumber({accNumber:cus.accountNumber, balance:100*i})
}


// console.log(MeezanBank)

// Bank Functionality
async function bankService(bank:Bank) {
 
 do {
    console.log(`${Chalk.yellowBright(`--------------------------`)}${Chalk.greenBright(`Welcome TO Meezan Bank`)}${Chalk.yellowBright(`--------------------------`)}`)
    let service = await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:Chalk.yellowBright("which service you want to do?"),
            choices:["Cash Withdraw", "Cash Deposite", "Chehcking Balance", "Exit.."]
        }
    ])
    if(service.select == "Cash Withdraw"){
        let res = await inquirer.prompt([
            {
                name:"num",
                type:"input",
                message:Chalk.greenBright("Please Enter Your Account Number:"),
                transformer: (input: string, answers: any, flags: any) => {
                    return Chalk.yellowBright(input); // Change the input color
                },
            }
        ])
        let account = MeezanBank.account.find((acc)=>acc.accNumber == res.num)
        if(!account){
            console.log(Chalk.red.bold("Invalid Account Number..."))
        }
        if(account){
            let ans = await inquirer.prompt([
                {
                    name:"dollar",
                    type:"number",
                    message:Chalk.blueBright("Please Enter your Amount"),
                    transformer: (input: string, answers: any, flags: any) => {
                        return Chalk.redBright(input); // Change the input color
                    },
                }
            ])
            if(ans.dollar > account.balance){
                console.log(Chalk.red.bold("Mojooda Raqam Apke Account Me Mojood Nhi Hai..."))
            }
           
            let newBalance = account.balance - ans.dollar
            // transaction Method call
            MeezanBank.transacionMethod({accNumber:account.accNumber, balance:newBalance})
            if(ans.dollar <= account.balance){
                console.log(Chalk.bold.yellowBright(`Your remaining Balance is ${Chalk.green(newBalance)}`))
            }
            
        }
        
    }
    if(service.select == "Cash Deposite"){
         let res = await inquirer.prompt([
            {
                name:"num",
                type:"input",
                message:Chalk.blueBright("Please Enter Your Account Number:"),
                transformer: (input: string, answers: any, flags: any) => {
                    return Chalk.red(input); // Change the input color
                },
            }
        ])
        let account = MeezanBank.account.find((acc)=>acc.accNumber == res.num)
        if(!account){
            console.log(Chalk.red.bold("Invalid Account Number..."))
        }
        if(account){
            let ans = await inquirer.prompt([
                {
                    name:"dollar",
                    type:"number",
                    message:Chalk.greenBright("Please Enter your Amount"),
                    transformer: (input: string, answers: any, flags: any) => {
                        return Chalk.yellowBright(input); // Change the input color
                    },
                }
            ])
            let newBalance = account.balance + ans.dollar
            // transaction Method call
            MeezanBank.transacionMethod({accNumber:account.accNumber, balance:newBalance})
            console.log(Chalk.bold.yellowBright(`Your remaining Balance is ${Chalk.green(newBalance)}`))

        }
    }
    if(service.select == "Chehcking Balance"){
        let res = await inquirer.prompt([
            {
                name:"num",
                type:"input",
                message:Chalk.blueBright("Please Enter Your Account Number:"),
                transformer: (input: string, answers: any, flags: any) => {
                    return Chalk.yellowBright(input); // Change the input color
                },
            }
        ])
        let account = MeezanBank.account.find((acc)=>acc.accNumber == res.num)
        if(!account){
            console.log(Chalk.red.bold("Invalid Account Number..."))
        }
        if(account){
            let name = MeezanBank.customer.find((item)=>item.accountNumber == account.accNumber)
            console.log(`Dear ${Chalk.green.italic(name?.firstName)} ${Chalk.green.italic(name?.lastName)} your account balance is ${Chalk.bold.blue(`$${account.balance}`)} `)
        }
    }
    if(service.select == "Exit.."){
        return;
    }
 } while (true);
}

bankService(MeezanBank)
