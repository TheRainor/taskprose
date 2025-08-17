const pages = [
  "auth",
  "all-tasks",
  "today-tasks",
  "important-tasks",
  "planned-tasks",
  "completed-tasks",
  "404"
];

const viewController = pages.reduce((acc, viewName) => {
  const fnName = "get" +
      viewName
          .split(/[-\/]/)
          .map(part => part[0].toUpperCase() + part.slice(1))
          .join("") +
      "Page";

  if (viewName === "auth") {
      acc[fnName] = (req, res) => {
          const success = req.query.register === 'success'
              ? 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.'
              : undefined;

          res.render(viewName, {
              success,
              activeForm: 'login',   
              formData: {}           
          });
      };
  } else if (viewName === "404") {
      acc[fnName] = (req, res) => {
          res.render(viewName);
      };
  } else {
      // activePage değerini viewName'den türet
      let activePage = viewName.replace('-tasks', '').replace('all', 'all').replace('today', 'today').replace('important', 'important').replace('planned', 'planned').replace('completed', 'completed');
      acc[fnName] = async (req, res) => {
          try {
              // Middleware'den gelen kullanıcı bilgisini kullan
              const user = req.user || null;
              res.render(viewName, { user, activePage });
          } catch (error) {
              // Hata durumunda kullanıcı olmadan render et
              res.render(viewName, { user: null, activePage });
          }
      };
  }
  return acc;
}, {});

export default viewController;
