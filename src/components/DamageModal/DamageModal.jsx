import styles from "./DamageModal.module.scss";
import React, { useEffect, useState, useRef } from "react";
import useOnClickOutSide from "../../hooks/useOnClickOutSide";
import { Type } from "../index";

export const DamageModal = ({ setIsModalOpen, damageRelations }) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState();
  const modalRef = useRef();

  useOnClickOutSide(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    const damageArr = damageRelations.map((damage) => separateObjectBetweenToAndFrom(damage));

    if (damageArr.length > 1) {
      const obj = joinDamageRelations(damageArr);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(damageArr[0].from));
    }
  }, []);

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  };

  const filterForUniqueValues = (value, duplicateValue) => {
    return value.reduce((acc, currentValue) => {
      const { name, url } = currentValue;

      const filterAcc = acc.filter((a) => a.name !== name);

      return filterAcc.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: duplicateValue, name, url }, ...filterAcc]);
    }, []);
  };

  const joinDamageRelations = (damageArr) => {
    return {
      to: joinObject(damageArr, "to"),
      from: joinObject(damageArr, "from"),
    };
  };

  const joinObject = (arr, type) => {
    const key = type;
    const firstArrValue = arr[0][key];
    const secondArrValue = arr[1][key];

    const result = Object.entries(secondArrValue).reduce((acc, [keyName, value]) => {
      const result = firstArrValue[keyName].concat(value);
      return (acc = { [keyName]: result, ...acc });
    }, {});

    return result;
  };

  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});

    return result;
  };

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  const filterDamageRelations = (filterType, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(filterType);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithFilterTypeRemove = keyName.replace(filterType, "");

        return (acc = { [keyWithFilterTypeRemove]: value, ...acc });
      }, {});

    return result;
  };

  return (
    <div className={styles.DamageModal}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
            X
          </span>
        </div>
        {damagePokemonForm ? (
          <>
            {Object.entries(damagePokemonForm).map(([keyName, value]) => {
              const key = keyName;
              const valueOfKeyName = {
                double_damage: "Weak",
                half_damage: "Resistant",
                no_damage: "Immune",
              };

              return (
                <div className={styles.relation} key={key}>
                  <h2>{valueOfKeyName[key]}</h2>
                  <div className={styles.typeContainer}>
                    {value.length > 0 ? (
                      value.map(({ name, url, damageValue }) => {
                        return <Type key={url} type={name} damageValue={damageValue} />;
                      })
                    ) : (
                      <Type key="none" type="none" />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
