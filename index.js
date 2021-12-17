/* Your Code Here */
const createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (employees) {
    let employeeRecord = []
    employees.map(function (employee) {
        employeeRecord.push(createEmployeeRecord(employee))
    })
    return employeeRecord
}

const createTimeInEvent = function (dateStamp) {
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.substring(11,15)),
        date: dateStamp.substring(0,10)
    }
    this.timeInEvents.push(timeIn)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.substring(11,15)),
        date: dateStamp.substring(0,10)
    }
    this.timeOutEvents.push(timeOut)
    return this
}

const hoursWorkedOnDate = function (date) {
    let timeInHour;
    let timeOutHour;
    this.timeInEvents.map(function (e) {
        if(e.date === date) {
            timeInHour = e.hour
        }
    })
    this.timeOutEvents.map(function (e) {
        if(e.date === date) {
            timeOutHour = e.hour
        }
    })
    return (timeOutHour - timeInHour) / 100
}

const wagesEarnedOnDate = function (date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


const findEmployeeByFirstName = function (srcArray, firstName) {
    const findName = srcArray.find(function (employee) {
        if(employee.firstName === firstName) {
            return employee
        }
    })
    return findName
}

const calculatePayroll = function (employees) {
    const wages = employees.map(function (employee) {
        return allWagesFor.call(employee)
    })
    return wages.reduce((total, wage) => total + wage, 0)
}
