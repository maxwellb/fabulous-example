import formSubmit from "./formSubmit";

export default async function ApplyForm() {
    return (
        <div>
            <form action={formSubmit}>
                <label>
                    First Name
                    <input type="text" name="firstName" required />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lastName" required />
                </label>
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <label>
                    Phone
                    <input type="text" name="phone" required />
                </label>
                <label>
                    Date of Birth
                    <input type="text" name="dob" required />
                </label>
                <label>
                    SSN
                    <input type="password" name="ssn" required />
                </label>
                <label>
                    Address
                    <input type="text" name="address" required />
                </label>
                <label>
                    Address 2
                    <input type="text" name="address2" />
                </label>
                <label>
                    City
                    <input type="text" name="city" required />
                </label>
                <label>
                    State
                    <input type="text" name="state" required />
                </label>
                <label>
                    ZIP
                    <input type="text" name="zip" required />
                </label>
                <label>
                    Program Name
                    <input type="text" name="programName" required />
                </label>
                <label>
                    Amount Requested
                    <input type="text" name="amountRequested" required />
                </label>
                <label>
                    <input type="checkbox" name="agreementComplete" />
                    Agreement Complete
                </label>
                <button type="submit" className="bg-blue-400 text-white px-6 py-3 rounded-md font-bold">Apply</button>
            </form>
        </div>
    );
}
