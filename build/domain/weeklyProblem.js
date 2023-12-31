export function isWeeklyProblem(obj) {
    if (typeof obj.id === "number" || typeof obj.problemId === "number" || typeof obj.acceptedUserCount === "number" || typeof obj.registeredDate === "string")
        return false;
    return true;
}
