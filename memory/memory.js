
// harmonizing os
const path = require(`path`);
const fs = require(`fs/promises`);

//making a class to manage memory management
class Memory {
    //getting database location
    db = path.join(__dirname, `../`, `db`, `db.json`);
    //currrent state of flat-file database
    currentState = async () => {
        const body = await fs.readFile(this.db, {
            encoding: `utf-8`
        });
        const data = await JSON.parse(body);
        return data;
    }
    //lading database
    load = async () => await this.currentState();

    //save database
    add = async data => {
        const currentDatabase = await this.currentState();
        //push current data to data and gives id
        const {nanoid} = await import(`nanoid`);
        data.id = nanoid();
        currentDatabase.push(data);
        await this.save(currentDatabase);
        return data;

    }
    //delete a note
    delete = async id => {
        try {
            const database = await this.currentState();
            await this.save(database.filter(note => note.id != id));
        } catch (err) {
            throw new Error(`Could not delete.`);
        }
    }

    async save(data) {
        await fs.writeFile(this.db, JSON.stringify(data));
    }
}

module.exports = new Memory();