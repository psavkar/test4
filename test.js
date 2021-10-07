import Airtable from "airtable"

export default defineComponent({
  props: {
    airtable: {
      type: "app",
      app: "airtable",
    },
    baseId: {
      type: "$.airtable.baseId",
      appProp: "airtable",
    },
    tableId: {
      type: "$.airtable.tableId",
      baseIdProp: "baseId",
    },
  },
  async run({steps, $}) {
    const base = new Airtable({apiKey: this.airtable.$auth.api_key}).base(this.baseId);

    const data = []
    
    await base(this.tableId).select({
      // pass optional config parameters here
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            data.push(record._rawJson)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    })

    return data
  },
})
