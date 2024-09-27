import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Pencil,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";

interface Student {
  dni: string;
  nombre: string;
  apellido: string;
}

interface Subject {
  id: number;
  nombre: string;
  anio: string;
}

export default function GestionEducativa() {
  const navigate = useNavigate();
  const [students, setAlumnos] = useState<Student[]>([]);
  const [searchDni, setSearchDni] = useState("");
  const [activeTab, setActiveTab] = useState("estudiantes");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [newYear, setNewYear] = useState("");
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const filteredStudents = students.filter((student) =>
    student.dni?.includes(searchDni)
  );

  const handleNewStudent = () => {
    navigate("/students/new");
  };

  const handleEditStudent = (student: Student) => {
    navigate(`/students/edit`, { state: student });
  };
  
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("http://localhost:8080/students");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error fetching alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch("http://localhost:8080/subjects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchMaterias();
  }, []);

  const handleCreateSubject = async () => {
    // Asegúrate de que newYear sea un número y no esté vacío
    if (!newSubject.trim() || !newYear.trim() || isNaN(parseInt(newYear)))
      return;

    console.log(newYear);

    try {
      const response = await fetch("http://localhost:8080/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: newSubject, anio: parseInt(newYear) }), // Convierte newYear a número
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(newYear);
      const createdSubject = await response.json();
      setSubjects((prev) => [...prev, createdSubject]);
      setNewSubject("");
      setNewYear(""); // Reseteamos el campo del año
      console.log(createdSubject);
    } catch (error) {
      console.error("Error creando materia:", error);
    }
  };

  const handleDeleteStudent = async (dni: string) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/students/disable/${dni}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`Error eliminando estudiante: ${response.status}`);
      }

      // Filtra el estudiante eliminado de la lista de estudiantes
      setAlumnos((prevStudents) =>
        prevStudents.filter((student) => student.dni !== dni)
      );
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="mr-4" />
          <h1 className="text-xl font-bold">Gestión Educativa</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Search />
          <Bell />
          <User />
          <ChevronDown />
        </div>
      </header>
      <main className="flex-grow p-6 max-w-4xl mx-auto w-full">
        <div className="flex space-x-4 mb-4">
          {["estudiantes", "materias", "inscripciones"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium rounded-md ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {activeTab === "estudiantes" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Estudiantes</h2>
            <button
              onClick={handleNewStudent}
              className="bg-[#1e8449] hover:bg-[#138d75] text-white font-bold py-2 px-4 my-5 rounded inline-flex items-center transition-colors duration-300"
            >
              <Plus className="mr-2" size={20} />
              Nuevo Alumno
            </button>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por DNI"
                value={searchDni}
                onChange={(e) => setSearchDni(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">DNI</th>
                  <th className="text-left p-2">Nombre</th>
                  <th className="text-left p-2">Apellido</th>
                  <th className="text-left p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.dni} className="hover:bg-gray-50">
                    <td className="p-2">{student.dni}</td>
                    <td className="p-2">{student.nombre}</td>
                    <td className="p-2">{student.apellido}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-green-700 rounded"
                        onClick={() => handleEditStudent(student)}>
                          <Pencil size={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-red-700 rounded"
                          onClick={() => handleDeleteStudent(student.dni)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "materias" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Materias</h2>
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                placeholder="Nueva materia"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l-md"
              />
              <input
                type="text"
                placeholder="Año"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                className="flex-grow px-3 py-2 border"
              />
              <button
                onClick={handleCreateSubject}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Nombre</th>
                  <th className="text-left p-2">Año</th>
                  <th className="text-left p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="p-2">
                      {editingSubject?.id === subject.id ? (
                        <input
                          type="text"
                          value={editingSubject.nombre}
                          onChange={(e) =>
                            setEditingSubject({
                              ...editingSubject,
                              nombre: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        subject.nombre
                      )}
                    </td>
                    <td className="p-2">
                      {editingSubject?.id === subject.id ? (
                        <input
                          type="number" // Cambiado a "number" para el campo de año
                          value={editingSubject.anio}
                          onChange={(e) =>
                            setEditingSubject({
                              ...editingSubject,
                              anio: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        subject.anio
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        {editingSubject?.id === subject.id ? (
                          <button
                            // onClick={() => handleUpdateSubject(editingSubject)} // Asegúrate de que esta función esté definida
                            className="p-1 hover:bg-green-200 rounded text-green-600"
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            // onClick={() => handleEditSubject(subject)} // Asegúrate de que esta función esté definida
                            className="p-2 hover:bg-green-700 rounded"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                        //   onClick={() => handleDeleteSubject(subject.id)} // Asegúrate de que esta función esté definida
                          className="p-1 hover:bg-red-700 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; 2024 ITEC 3° año Analista y Programador de Sistemas. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  );
}
