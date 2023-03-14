import { useState, useRef } from "react";
import { findCombinations } from "./Combinations";

function App() {
  //states
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [forms, setForms] = useState([
    {
      formFields: [
        {
          name: "",
          credit: "",
          isConstant: false,
          team: "",
          points: "",
          isExcluded: false,
          isCaptain: false,
          isViceCaptain: false,
          pts: "",
          reb: "",
          ast: "",
          stl: "",
          block: "",
          total: "",
          isSubstitute: false,
        },
      ],
    },
  ]);

  const [min_credit, setMinCredit] = useState("");
  const [max_credit, setMaxCredit] = useState("");
  const [team_size, setTeamSize] = useState("");
  const [game, setGame] = useState("");
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

  const handleAddForm = () => {
    const updatedForms = [...forms];
    updatedForms.push({
      formFields: [
        {
          name: "",
          credit: "",
          isConstant: false,
          team: "",
          points: "",
          isExcluded: false,
          isCaptain: false,
          isViceCaptain: false,
          pts: "",
          reb: "",
          ast: "",
          stl: "",
          block: "",
          total: "",
          isSubstitute: false,
        },
      ],
    });
    setForms(updatedForms);
  };

  const clearAllPoints = () => {
    const updatedForms = forms.map((group) => {
      const updatedFields = group.formFields.map((field) => {
        if (field.points) {
          return {
            ...field,
            points: "",
            pts: "",
            reb: "",
            ast: "",
            stl: "",
            block: "",
            total: "",
          };
        }
        return field;
      });
      return { ...group, formFields: updatedFields };
    });
    setForms(updatedForms);
  };

  const handleDeleteGroup = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms.splice(formIndex, 1);
    setForms(updatedForms);
  };

  const handleTeamChange = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].team = event.target.value;
    setForms(updatedForms);
  };

  const handleAddFields = (formIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields.push({
      name: "",
      credit: "",
      isConstant: false,
      team: "",
      points: "",
      isExcluded: false,
      isCaptain: false,
      isViceCaptain: false,
      pts: "",
      reb: "",
      ast: "",
      stl: "",
      block: "",
      total: "",
      isSubstitute: false,
    });
    setForms(updatedForms);
  };

  const handleremovePlayer = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields.splice(fieldIndex, 1);
    setForms(updatedForms);
  };

  const handleInputChangeName = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].name = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeCredit = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].credit = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangePoints = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].points = event.target.value;
    setForms(updatedForms);
  };

  const handleIsCaptain = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isCaptain = !formFields[fieldIndex].isCaptain;
    setForms(updatedForms);
  };

  const handleIsViceCaptain = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isViceCaptain =
      !formFields[fieldIndex].isViceCaptain;
    setForms(updatedForms);
  };

  const handleInputChangePts = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].pts = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeRebounce = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].reb = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeAssist = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].ast = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeSteal = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].stl = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeBlock = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].block = event.target.value;
    setForms(updatedForms);
  };

  const handleCheckboxChange = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isConstant = !formFields[fieldIndex].isConstant;
    setForms(updatedForms);
  };

  const handleIsExcluded = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isExcluded = !formFields[fieldIndex].isExcluded;
    setForms(updatedForms);
  };

  const handleIsSub = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isSubstitute = !formFields[fieldIndex].isSubstitute;
    setForms(updatedForms);
  };

  const handleMinCreditChange = (event) => {
    setMinCredit(event.target.value);
  };

  const handleTeamSize = (event) => {
    setTeamSize(event.target.value);
  };

  const handleGame = (event) => {
    setGame(event.target.value);
  };

  const handleMaxCreditChange = (event) => {
    setMaxCredit(event.target.value);
  };

  function calculateTotal(pts, reb, ast, stl, blk) {
    const ptsValue = parseFloat(pts) || 0;
    const rebValue = parseFloat(reb) || 0;
    const astValue = parseFloat(ast) || 0;
    const stlValue = parseFloat(stl) || 0;
    const blkValue = parseFloat(blk) || 0;

    return (
      ptsValue + rebValue * 1.2 + astValue * 1.5 + stlValue * 3 + blkValue * 3
    );
  }

  const nameRef = useRef(null);
  const creditRef = useRef(null);

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const refs = [nameRef, creditRef];

    for (let i = 0; i < refs.length; i++) {
      if (!refs[i].current.validity.valid) {
        refs[i].current.focus();
        break;
      }
    }

    setIsFilterEnabled(true);
    const conPlayers = forms.reduce((acc, form) => {
      const constantFields = form.formFields.filter(
        (field) => field.isConstant
      );

      return acc.concat(constantFields);
    }, []);

    const excludedPlayers = forms.reduce((acc, form) => {
      const constantFields = form.formFields.filter(
        (field) => field.isExcluded
      );

      return acc.concat(constantFields);
    }, []);

    const subPlayers = forms
      .map((form) =>
        form.formFields
          .filter((field) => field.isSubstitute)
          .map((field) => field.name)
      )
      .flat();

    const teamAplayers = forms
      .map((form) =>
        form.formFields
          .filter((field) => field.team === "teamA")
          .map((field) => field.name)
      )
      .flat();

    const teamBplayers = forms
      .map((form) =>
        form.formFields
          .filter((field) => field.team === "teamB")
          .map((field) => field.name)
      )
      .flat();

    const arr = findCombinations(
      forms,
      conPlayers,
      min_credit,
      max_credit,
      team_size,
      teamAplayers,
      teamBplayers,
      game,
      excludedPlayers,
      subPlayers
    );

    // eslint-disable-next-line array-callback-return
    let l = arr.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(arr);
      }
    });
    setResult(l);
  };

  const sortListBasedOnAverage = () => {
    const array = [...result];
    const sort_List = array.sort((a, b) => b[4] - a[4]);
    // eslint-disable-next-line array-callback-return
    let l = sort_List.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(sort_List);
      }
    });
    setResult(l);
  };

  const sortListBasedOnPoints = () => {
    const array = [...result];
    const sort_List = array.sort((a, b) => b[3] - a[3]);
    // eslint-disable-next-line array-callback-return
    let l = sort_List.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(sort_List);
      }
    });
    setResult(l);
  };

  const sortListBasedOnCredits = () => {
    const array = [...result];
    const sort_List = array.sort((a, b) => b[2] - a[2]);
    // eslint-disable-next-line array-callback-return
    let l = sort_List.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(sort_List);
      }
    });
    setResult(l);
  };

  return (
    <div className="mx-auto w-full bg-gray-200 h-screen">
      <div className="w-full flex justify-center bg-gray-200 px-4 py-4">
        <div className="sm:mt-10 sm:w-[950px] bg-white border shadow-lg rounded-lg overflow-hidden  sm:px-10 sm:py-10">
          <div className="w-full flex justify-center mb-10 bg-[#232323] py-2">
            <p className="font-medium text-2xl font-sans text-gray-400">
              Team Maker
            </p>
          </div>
          <div className="px-2">
            <div className="flex space-x-4 mb-5 md:space-x-10">
              <div className="min-w-max">
                <select
                  value={game}
                  onChange={handleGame}
                  placeholder="Select Game"
                  className="form-control block w-full px-2.5 py-1.5 text-sm  sm:text-base font-normal text-gray-400 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option className="font-normal">Select Game</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Handball">Handball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Kabaddi">Kabaddi</option>
                  <option value="Baseball">Baseball</option>
                </select>
              </div>
              <div className="min-w-min">
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Team size"
                  value={team_size}
                  onChange={handleTeamSize}
                />
              </div>
            </div>
            {forms.map((form, formIndex) => (
              <form key={formIndex} className="space-y-6 md:space-y-10 mb-6">
                <div>
                  <label className="block text-md font-medium text-gray-600">
                    Group - {formIndex + 1}
                  </label>
                </div>

                {form.formFields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-4">
                    <div>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="name"
                            value={field.name}
                            onChange={(event) =>
                              handleInputChangeName(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                            ref={nameRef}
                            required
                          />
                          <input
                            type="number"
                            placeholder="credit"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.credit}
                            onChange={(event) =>
                              handleInputChangeCredit(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                            ref={creditRef}
                            required
                          />
                          <input
                            type="number"
                            placeholder="points"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.points}
                            onChange={(event) =>
                              handleInputChangePoints(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                          />
                          <div className="flex items-center">
                            <label className="font-regular text-sm sm:text-base text-gray-500 flex items-center">
                              <input
                                type="checkbox"
                                className="mr-1.5 sm:w-4 sm:h-4"
                                checked={field.isConstant}
                                onChange={() =>
                                  handleCheckboxChange(formIndex, fieldIndex)
                                }
                              />
                              Constant
                            </label>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ff0000"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#fff"
                              className="w-6 h-6"
                              onClick={() =>
                                handleremovePlayer(formIndex, fieldIndex)
                              }
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <hr />
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            placeholder="pts"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.pts}
                            onChange={(event) =>
                              handleInputChangePts(formIndex, fieldIndex, event)
                            }
                          />
                          <input
                            type="number"
                            placeholder="rebounce"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.reb}
                            onChange={(event) =>
                              handleInputChangeRebounce(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                          />
                          <input
                            type="number"
                            placeholder="assist"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.ast}
                            onChange={(event) =>
                              handleInputChangeAssist(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                          />
                          <input
                            type="number"
                            placeholder="steal"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.stl}
                            onChange={(event) =>
                              handleInputChangeSteal(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                          />
                          <input
                            type="number"
                            placeholder="block"
                            className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={field.block}
                            onChange={(event) =>
                              handleInputChangeBlock(
                                formIndex,
                                fieldIndex,
                                event
                              )
                            }
                          />
                          <div className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                            <p className="text-gray-400 text-xs sm:text-base">
                              <span className="text-gray-700 text-xs sm:text-base">
                                {calculateTotal(
                                  field.pts,
                                  field.reb,
                                  field.ast,
                                  field.stl,
                                  field.block
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex ">
                          <input
                            type="radio"
                            className="mr-1"
                            name={`team-${formIndex}-${fieldIndex}`}
                            value="teamA"
                            checked={field.team === "teamA"}
                            onChange={(event) =>
                              handleTeamChange(formIndex, fieldIndex, event)
                            }
                            required
                          />
                          White
                        </label>
                      </div>
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex">
                          <input
                            type="radio"
                            className="mr-1"
                            name={`team-${formIndex}-${fieldIndex}`}
                            value="teamB"
                            checked={field.team === "teamB"}
                            onChange={(event) =>
                              handleTeamChange(formIndex, fieldIndex, event)
                            }
                            required
                          />
                          Black
                        </label>
                      </div>
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={field.isExcluded}
                            onChange={() =>
                              handleIsExcluded(formIndex, fieldIndex)
                            }
                          />
                          Excluded
                        </label>
                      </div>
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={field.isCaptain}
                            onChange={() =>
                              handleIsCaptain(formIndex, fieldIndex)
                            }
                          />
                          Captain
                        </label>
                      </div>
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={field.isViceCaptain}
                            onChange={() =>
                              handleIsViceCaptain(formIndex, fieldIndex)
                            }
                          />
                          Vice Captain
                        </label>
                      </div>
                      <div className="mx-2 sm:mx-4">
                        <label className="font-regular text-xs sm:text-sm text-gray-600 flex">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={field.isSubstitute}
                            onChange={() => handleIsSub(formIndex, fieldIndex)}
                          />
                          Substitute
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <div className="min-w-fit">
                    <button
                      className=" mb-4 min-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="button"
                      onClick={() => handleAddFields(formIndex)}
                    >
                      Add Players
                    </button>
                  </div>
                  <div className="min-w-fit">
                    <button
                      type="button"
                      className=" mb-4 min-w-fit text-white bg-[#f34141] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={() => handleDeleteGroup(formIndex)}
                    >
                      Delete Group
                    </button>
                  </div>
                </div>
              </form>
            ))}
            <div className="flex space-x-4 mt-6 items-center">
              <div className="min-w-fit">
                <button
                  type="button"
                  className="max-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleAddForm}
                >
                  Add Group
                </button>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Min Credit"
                  className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={min_credit}
                  onChange={handleMinCreditChange}
                />
              </div>
              <p>-</p>
              <div>
                <input
                  type="number"
                  placeholder="Max Credit"
                  className="form-control block w-full px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={max_credit}
                  onChange={handleMaxCreditChange}
                />
              </div>
            </div>
            <div className="flex justify-center w-full my-9">
              <button
                type="submit"
                className="text-white bg-[#40b511] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Generate
              </button>
            </div>
            <div className="mb-6">
              <div>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="search...eg: 5-2, 7-4"
                    disabled={!isFilterEnabled}
                    className="min-w-fit mb-8 form-control block  px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      handleSubmit();
                    }}
                  />
                  <div className="min-w-fit">
                    <button
                      type="button"
                      className=" mb-4 min-w-fit text-white bg-[#f34141] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={clearAllPoints}
                    >
                      Clear Points
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 text-xs sm:text-base font-light">
                  <button
                    onClick={sortListBasedOnCredits}
                    className="flex justify-center"
                  >
                    Credits
                    <p className="ml-1">&#9660;</p>
                  </button>
                  <button
                    onClick={sortListBasedOnPoints}
                    className="flex justify-center"
                  >
                    Points
                    <p className="ml-1">&#9660;</p>
                  </button>
                  <button
                    onClick={sortListBasedOnAverage}
                    className="flex justify-center"
                  >
                    Average
                    <p className="ml-1">&#9660;</p>
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                {result &&
                  result.map((array, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-200 rounded m-1 p-2 text-center"
                      >
                        <div className="flex justify-between">
                          <p>Team #{index + 1}</p>
                          <div className="flex">
                            <div className="border border-[#40b511] bg-gray-100 rounded-lg px-3 mx-3 text-sm">
                              <p>{array[1]}</p>
                            </div>
                            <div className="pl-2 text-sm">
                              <p>Sub: {array[5]}</p>
                            </div>
                            <div className="pl-2 text-sm">
                              <p>Credit: {array[2]}</p>
                            </div>
                            <div className="ml-2 text-sm">
                              <p>Points: {array[3]}</p>
                            </div>
                            <div className="ml-2 text-sm">
                              <p>Average: {array[4]}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-wrap">
                          {array[0].map((player, index) => {
                            return <p key={index}> {player}</p>;
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full bg-gray-200 h-screen">
    // </div>
  );
}

export default App;
