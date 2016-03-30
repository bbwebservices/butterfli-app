var context = require.context('./components', true, /\.jsx$/); 
context.keys().forEach(context);